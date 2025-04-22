import * as dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import cleanCss from 'gulp-clean-css'; // Сжатие CSS
import webpcss from 'gulp-webpcss'; // Поддержка WebP в CSS
import autoprefixer from 'gulp-autoprefixer'; // Вендорные префиксы
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиа-запросов

const sass = gulpSass(dartSass);

export const scss = () => {
    return app.gulp.src(app.path.src.scss)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss({
                    webpClass: ".webp",
                    noWebpClass: ".no-webp"
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    overrideBrowserslist: ["last 2 versions", "> 1%", "not dead"],
                    cascade: true
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.css)) // Вывод обычного CSS
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(rename({ extname: ".min.css" }))
        .pipe(app.gulp.dest(app.path.build.css)) // Вывод минифицированного CSS
        .pipe(app.plugins.browsersync.stream());
};