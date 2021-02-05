<template>
    <div class="block" style="padding: 30px 20px 0px 0px">
        <el-timeline>
            <el-timeline-item placement="top" timestamp="20h-21h">
                <el-card>
                    <h2>
                        <a href="https://soundcloud.com/falebrou"
                            >Fa le brou (Ambient live set)</a
                        >
                    </h2>
                    <el-divider></el-divider>
                    <iframe
                        width="100%"
                        height="450"
                        scrolling="no"
                        frameborder="no"
                        allow="autoplay"
                        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/379080542&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
                    ></iframe>
                </el-card>
            </el-timeline-item>

            <el-timeline-item placement="top" timestamp="21h-22h">
                <el-card>
                    <h2>
                        <a href="https://www.facebook.com/tintmtl"
                            >Tint (Electro live set)</a
                        >
                    </h2>
                    <el-divider></el-divider>
                    <iframe
                        src="https://player.vimeo.com/video/337950152"
                        width="100%"
                        height="360"
                        frameborder="0"
                        allow="autoplay; fullscreen"
                        allowfullscreen
                    ></iframe>
                </el-card>
            </el-timeline-item>

            <el-timeline-item placement="top" timestamp="22h-00h">
                <el-card>
                    <h2>
                        <a href="www.facebook.com/siliconbeats"
                            >Collectif Silicon Beats</a
                        >
                        presents:
                    </h2>
                    <h3>
                        <a href="soundcloud.com/vinu-vinu-music">
                            Viñu-vinu Liveset
                        </a>
                    </h3>
                    <h3>
                        <a href="https://soundcloud.com/victor-drouin"
                            >V.ictor</a
                        >
                        + <a href="https://soundcloud.com/bassilusc">BSLC</a> =
                        ❤
                    </h3>
                    <el-divider></el-divider>
                    <iframe
                        src="https://player.vimeo.com/video/337886735"
                        width="100%"
                        height="360"
                        frameborder="0"
                        allow="autoplay; fullscreen"
                        allowfullscreen
                    ></iframe>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script>
export default {
    auth: false,
};
</script>
