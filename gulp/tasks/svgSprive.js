import svgSprite from "gulp-svg-sprite";

export const svgSprive = () => {
    return app.gulp.src(`${app.path.src.svgicons}`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG",
                message: "Error: <%= error.message %>"
            }))
        )
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: '../sprite/sprite.svg',
                },
            },
            shape: {
                transform: [
                    {
                        svgo: {
                            js2svg: { indent: 4, pretty: true },
                            plugins: [
                                {
                                    name: 'removeAttrs',
                                    params: {
                                        attrs: '(fill|stroke)',
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        }))
        .pipe(app.gulp.dest(app.path.build.images))
}