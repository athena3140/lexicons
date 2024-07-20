// import data from "../../assets/api/grade-10.json";
// export default defineEventHandler((event) => {
// 	return data;
// });

import { promises as fs } from "fs";
import { resolve } from "path";
import { H3Event } from "h3";

export default defineEventHandler(async (event: H3Event) => {
	const params = event.context.params as { grade: string };
	const { grade } = params;
	const filePath = `./public/api/${grade}.json`;

	try {
		const data = await fs.readFile(filePath, "utf-8");
		const jsonData = JSON.parse(data);
		return jsonData;
	} catch (error) {
		return { error: "Data not found" };
	}
});
