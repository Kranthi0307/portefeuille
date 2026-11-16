### Learning:

- Angular packages must stay at the same version, even within the same minor/patch line.
- Using `^19.2.0` on multiple Angular dependencies can pull different patch releases (for example `19.2.15` vs `19.2.17`), which creates peer dependency conflicts.
- The correct fix is to pin the Angular packages to one consistent version, ideally the version already expected by the repo or the newest compatible patch in the same release train.
- In this repo, the real expected setup is a single Angular `19.2.x` family, and all Angular dependencies should be aligned before adding translation libraries or angular materials.


> **Note:** Angular peer dependencies must be version-aligned across the entire application. When using Angular 19 packages together, all `@angular/*` packages should resolve to the same patch version to avoid peer dependency conflicts during `npm install`. In this project, mixing `19.2.15` and `19.2.17` caused `ERESOLVE` errors (until `v0.1.0`). The fix was to install and pin all Angular dependencies to the same exact version before adding libraries such as `@ngx-translate/core`.
