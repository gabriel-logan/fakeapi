import fs from "fs";
import path from "path";

import users from "@/db/tables/users.json";

const deley = 0;

const dbFolder = "../tables";

export default class UserFakeModel {
	body: any;
	params: any;

	constructor(body: any, params: any) {
		this.body = body;
		this.params = params;
	}

	static findAll() {
		return new Promise((resolve) => {
			const data = users;
			setTimeout(() => resolve(data), deley);
		});
	}

	static findById(id: string) {
		return new Promise((resolve) => {
			const data = users;
			const item = data.find((item: any) => item.id.toString() === id);
			setTimeout(() => resolve(item), deley);
		});
	}

	static findOne(condition: any) {
		return new Promise((resolve) => {
			const data = users;
			const item = data.find((item: any) => {
				return Object.keys(condition).every(
					(key) => item[key] === condition[key],
				);
			});
			setTimeout(() => resolve(item), deley);
		});
	}

	static create(newData: any) {
		return new Promise((resolve) => {
			const data = users;
			data.push(newData);
			fs.writeFileSync(
				path.resolve(__dirname, `${dbFolder}/users.json`),
				JSON.stringify(data),
			);
			setTimeout(() => resolve(newData), deley);
		});
	}

	static update(id: string, updatedData: any) {
		return new Promise((resolve) => {
			const data = users;
			const index = data.findIndex((item: any) => item.id === Number(id));
			if (index !== -1) {
				data[index] = { ...data[index], ...updatedData };
				fs.writeFileSync(
					path.resolve(__dirname, `${dbFolder}/users.json`),
					JSON.stringify(data),
				);
				setTimeout(() => resolve(data[index]), deley);
			} else {
				resolve(null);
			}
		});
	}

	static delete(id: string) {
		return new Promise((resolve) => {
			const data = users;
			const index = data.findIndex((item: any) => item.id === Number(id));
			if (index !== -1) {
				const deletedData = data.splice(index, 1);
				fs.writeFileSync(
					path.resolve(__dirname, `${dbFolder}/users.json`),
					JSON.stringify(data),
				);
				setTimeout(() => resolve(deletedData), deley);
			} else {
				resolve(null);
			}
		});
	}
}
