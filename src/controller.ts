import { NextFunction, Request, Response } from "express";
import { hash } from "bcryptjs";
import notFoundError from "./errors/NotFoundError";
import { IUser } from "./types";
import pgdb from "./pgdb";

class Controller {
  public async createUser(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const { login, email, password } = req.body;

    try {
      const passwordHash = await hash(password, 10);
      const query =
        "INSERT INTO public.users (login, email, password) VALUES ($1, $2, $3);";

      await pgdb.none(query, [login, email, passwordHash]);

      return res
        .status(201)
        .json({ message: "Новый пользователь успешно создан" });
    } catch (err) {
      next(err);
    }
  }

  public async getAllUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const query = "SELECT * FROM public.users ORDER BY id LIMIT 25";
      const users = await pgdb.any<IUser>(query);

      return res.json(users);
    } catch (err) {
      next(err);
    }
  }

  public async getOneUser(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const query = "SELECT * FROM public.users WHERE id = $1";
      const user = await pgdb.oneOrNone<IUser>(query, +req.params.id);

      if (!user) {
        return next(new notFoundError("Пользователь с таким id не найден"));
      }

      return res.json(user);
    } catch (err) {
      next(err);
    }
  }

  public async updateUser(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    const userId = req.params.id;
    const { email, password } = req.body;

    try {
      const map = [
        { key: "email", value: email },
        { key: "password", value: password && (await hash(password, 10)) },
      ].filter((it) => it.value);

      const update = map.map((it, i) => `${it.key} = \$${i + 1}`).join(", ");
      const query = `UPDATE public.users
                     SET ${update}
                     WHERE id = \$${map.length + 1}`;

      await pgdb.none(query, [...map.map((it) => it.value), userId]);

      return res.json({ message: "Данные пользователя успешно обновлены" });
    } catch (err) {
      next(err);
    }
  }
}

export default new Controller();
