<template>
	<div>
		<Toaster
			position="top-center"
			:toastOptions="{
				style: { background: '#374151', color: 'white', border: 'none' },
				class: 'my-toast',
				descriptionClass: 'my-toast-description',
			}" />
		<h1 class="font-header text-3xl text-white mb-5 mt-16 mx-auto lg:w-3/4 w-full">Available Endpoints</h1>
		<div class="relative overflow-x-scroll rounded">
			<table class="lg:w-3/4 w-full mx-auto text-sm text-left text-gray-400">
				<thead class="text-xs bg-gray-700 text-gray-400">
					<tr>
						<th>Grade</th>
						<th>Endpoint</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(grade, index) in grades" :key="index">
						<td>{{ `Grade-${grade}` }}</td>
						<td>
							<span @click="copyToClipboard(grade)">
								{{ `https://lexicons.vercel.app/api/_content/grade-${grade}` }}
							</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<h1 class="font-header text-3xl text-white mb-5 mt-20 mx-auto lg:w-3/4 w-full">Example Usage</h1>
		<div class="relative lg:w-3/4 w-full mx-auto">
			<div class="bg-gray-700 text-white rounded-md">
				<div class="flex bg-gray-800 p-2 justify-between items-center mb-2 rounded-t">
					<span class="text-gray-400">JS</span>
					<button @click="copyCode" tabindex="-1" class="code bg-gray-800 text-gray-300 px-3 py-1 rounded-md">
						<svg
							class="h-5 w-5 text-gray-500"
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 20 20"
							fill="currentColor"
							aria-hidden="true">
							<path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z"></path>
							<path
								d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z"></path>
						</svg>
					</button>
				</div>
				<div class="overflow-x-auto p-4 pt-0">
					<pre
						style="
							font-family: monospace;
							color: rgb(201, 209, 217);
							font-weight: 400;
						"><span style="color: rgb(139, 148, 158); font-weight: 400;">// Using fetch API</span>
<span style="color: rgb(210, 168, 255); font-weight: 400;">fetch</span>(<span style="color: rgb(165, 214, 255); font-weight: 400;">'https://lexicons.vercel.app/api/_content/grade-7'</span>)
  .<span style="color: rgb(210, 168, 255); font-weight: 400;">then</span>(<span style="color: rgb(201, 209, 217); font-weight: 400;"><span style="color: rgb(201, 209, 217); font-weight: 400;">response</span> =&gt;</span> response.<span style="color: rgb(210, 168, 255); font-weight: 400;">json</span>())
  .<span style="color: rgb(210, 168, 255); font-weight: 400;">then</span>(<span style="color: rgb(201, 209, 217); font-weight: 400;"><span style="color: rgb(201, 209, 217); font-weight: 400;">data</span> =&gt;</span> <span style="color: rgb(255, 123, 114); font-weight: 400;">console</span>.<span style="color: rgb(210, 168, 255); font-weight: 400;">log</span>(data))
  .<span style="color: rgb(210, 168, 255); font-weight: 400;">catch</span>(<span style="color: rgb(201, 209, 217); font-weight: 400;"><span style="color: rgb(201, 209, 217); font-weight: 400;">error</span> =&gt;</span> <span style="color: rgb(255, 123, 114); font-weight: 400;">console</span>.<span style="color: rgb(210, 168, 255); font-weight: 400;">error</span>(<span style="color: rgb(165, 214, 255); font-weight: 400;">'Error:'</span>, error));

<span style="color: rgb(139, 148, 158); font-weight: 400;">// Using async/await</span>
<span style="color: rgb(255, 123, 114); font-weight: 400;">async</span> <span style="color: rgb(255, 123, 114); font-weight: 400;">function</span> <span style="color: rgb(210, 168, 255); font-weight: 400;">fetchLexicon</span>(<span style="color: rgb(201, 209, 217); font-weight: 400;">grade</span>) {
  <span style="color: rgb(255, 123, 114); font-weight: 400;">try</span> {
    <span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> response = <span style="color: rgb(255, 123, 114); font-weight: 400;">await</span> <span style="color: rgb(210, 168, 255); font-weight: 400;">fetch</span>(<span style="color: rgb(165, 214, 255); font-weight: 400;">`https://lexicons.vercel.app/api/_content/grade-<span style="color: rgb(201, 209, 217); font-weight: 400;">${grade}</span>`</span>);
    <span style="color: rgb(255, 123, 114); font-weight: 400;">const</span> data = <span style="color: rgb(255, 123, 114); font-weight: 400;">await</span> response.<span style="color: rgb(210, 168, 255); font-weight: 400;">json</span>();
    <span style="color: rgb(255, 123, 114); font-weight: 400;">console</span>.<span style="color: rgb(210, 168, 255); font-weight: 400;">log</span>(data);
  } <span style="color: rgb(255, 123, 114); font-weight: 400;">catch</span> (error) {
    <span style="color: rgb(255, 123, 114); font-weight: 400;">console</span>.<span style="color: rgb(210, 168, 255); font-weight: 400;">error</span>(<span style="color: rgb(165, 214, 255); font-weight: 400;">'Error:'</span>, error);
  }
}

<span style="color: rgb(210, 168, 255); font-weight: 400;">fetchLexicon</span>(<span style="color: rgb(121, 192, 255); font-weight: 400;">7</span>); <span style="color: rgb(139, 148, 158); font-weight: 400;">// Fetches lexicon for grade 7</span></pre>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
const { $toast } = useNuxtApp();

const copyToClipboard = (grade) => {
	navigator.clipboard.writeText(`https://lexicons.vercel.app/api/_content/grade-${grade}`);
	$toast.success("Copied to clipboard");
};

const copyCode = () => {
	navigator.clipboard
		.writeText(
			`
// Using fetch API
fetch('https://lexicons.vercel.app/api/_content/grade-7')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// Using async/await
async function fetchLexicon(grade) {
  try {
    const response = await fetch(\`https://lexicons.vercel.app/api/_content/grade-\${grade}\`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('Error:', error);
  }
}

fetchLexicon(7); // Fetches lexicon for grade 7
`
		)
		.then(() => {
			$toast.success("Copied to clipboard");
		});
};
const grades = [5, 6, 7, 8, 9, 10, 11, 12];
</script>

<style scoped>
table tr {
	@apply border-b bg-gray-800 border-gray-700;

	th,
	td {
		@apply px-6 py-4 w-fit whitespace-nowrap;
	}

	td:nth-child(2) span {
		@apply bg-gray-700 px-1 cursor-pointer;
	}
}

table tbody tr:last-child {
	@apply border-b-0;
}
</style>
