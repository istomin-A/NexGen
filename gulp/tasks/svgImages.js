export const svgImages = () => {
    return app.gulp.src(app.path.src.svg)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG-IMAGES",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(app.plugins.newer(app.path.build.images))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.plugins.browsersync.stream());
}