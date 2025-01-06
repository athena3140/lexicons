export default defineEventHandler(async (event) => {
	const params = event.context.params as { grade: string };

	const { grade } = params;
	const host = getRequestHeader(event, "host");
	const protocol = event.node.req.headers["x-forwarded-proto"] || "http";

	const originalUrl = `${protocol}://${host}/api/_content/query?_params={%22first%22:true,%22where%22:[{%22_path%22:%22/${grade}%22}],%22sort%22:[{%22_stem%22:1,%22$numeric%22:true}]}`;
	const data = await $fetch(originalUrl);

	return data;
});
