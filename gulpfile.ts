import { TaskFunction, src } from 'gulp';
import { dest } from 'vinyl-fs';
import ts from 'gulp-typescript';

export const build: TaskFunction = () => {
    const tsProject = ts.createProject('tsconfig.json');
    return src('src/**/*.{ts,tsx}', {debug: false})
        .pipe(tsProject())
        .pipe(dest('dist'));
};
