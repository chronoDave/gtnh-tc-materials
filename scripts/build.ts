import esbuild from 'esbuild';

const watch = process.argv.slice(2).includes('-w');
const config: esbuild.BuildOptions = {
  entryPoints: [
    'src/index.html',
    'src/index.ts',
    'src/index.css'
  ],
  outdir: 'docs',
  loader: {
    '.html': 'copy',
    '.css': 'copy'
  },
  bundle: true,
  minify: !watch
};

if (watch) {
  const context = await esbuild.context(config);
  context.watch();
} else {
  await esbuild.build(config);
}
