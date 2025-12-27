/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import-x/unambiguous */
import h from '@chronocide/hyper';
import { HTMLDatagridElement } from '@chronocide/web-components/datagrid';

customElements.define('chrono-datagrid', HTMLDatagridElement);

const read = async (file: File) =>
  new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Error reading file'));

    reader.readAsText(file);
  });

/**
 * `Attack`,
 * `Color`,
 * `Durability`,
 * `Harvest level`,
 * `Mining Speed`,
 * `Reinforced`,
 * `Shoddy`,
 * `XP Amount`
 */
const parse = (x: string) => {
  const materials = new Map<string, Map<string, string>>();

  let current: string | null = null;
  x.split(/\r?\n/).forEach(line => {
    const name = /(.*)\s*{/.exec(line)?.[1]?.trim();
    if (typeof name === 'string') {
      materials.set(name, new Map());
      current = name;
    }

    const matches = /\w:(\w+)=(.+)/.exec(line);
    if (
      current !== null &&
      typeof matches?.[1] === 'string' &&
      typeof matches[2] === 'string'
    ) materials.get(current)?.set(matches[1], matches[2]);
  });

  materials.forEach((material, name) => {
    if (material.size === 0) materials.delete(name);
  });

  return materials;
};

const input = document.getElementById('cfg') as HTMLInputElement | null;
input?.addEventListener('change', async () => {
  const file = input.files?.[0];
  if (!file) return;

  const raw = await read(file);
  if (typeof raw !== 'string') return;

  const materials = parse(raw);
  const keys = Array.from(new Set(Array.from(materials.values().map(material => Array.from(material.keys()))).flat()));
  console.log(keys);

  const table = h('chrono-datagrid')({ id: 'materials' })(
    h('h2')({ id: 'materials-label' })('Materials'),
    h('table')()(
      h('thead')()(
        h('tr')()(...[
          'Name',
          ...keys
        ].map(key => h('th')()(key)))
      ),
      h('tbody')()(...Array.from(materials.entries()).map(([name, material]) => h('tr')()(
        h('td')()(name),
        ...keys.map(key => h('td')()(material.get(key) ?? ''))
      )))
    ));

  document.getElementById('output')?.replaceChildren(table);
}, { passive: true });
