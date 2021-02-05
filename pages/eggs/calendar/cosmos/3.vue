<template>
    <div class="block" style="padding: 30px 20px 0px 0px">
        <el-timeline>
            Délectation visuelle proposée par
            <a href="https://www.facebook.com/aswedvisuals/">AS.WED</a>
            <el-divider></el-divider>
            <el-timeline-item placement="top" timestamp="20h30-21h30">
                <el-card>
                    <h2>
                        <a href="https://momamu.bandcamp.com/">Moma</a>
                        (Ambient/HipHop live set)
                    </h2>
                    <el-divider></el-divider>
                    <iframe
                        src="https://bandcamp.com/EmbeddedPlayer/album=4105539583/size=large/bgcol=ffffff/linkcol=333333/artwork=small/transparent=true/"
                        style="border: 0; width: 100%; height: 280px"
                        allowfullscreen
                        allow="encrypted-media"
                    ></iframe>
                </el-card>
            </el-timeline-item>

            <el-timeline-item placement="top" timestamp="21h45-22h45">
                <el-card>
                    <h2>
                        <a href="https://soundcloud.com/wingsforlouise"
                            >Wings for Louise</a
                        >(Ambient live set)
                    </h2>
                    <el-divider></el-divider>
                    <iframe
                        width="100%"
                        height="450"
                        scrolling="no"
                        frameborder="no"
                        allow="autoplay"
                        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/257732059&color=%2318a2d8&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
                    ></iframe>
                </el-card>
            </el-timeline-item>

            <el-timeline-item placement="top" timestamp="23h-00h">
                <el-card>
                    <h2>
                        <a href="https://www.facebook.com/vedoumusic/">Vedou</a
                        >(Melodic techno live set)
                    </h2>
                    <el-divider></el-divider>
                    <iframe
                        width="100%"
                        height="450"
                        scrolling="no"
                        frameborder="no"
                        allow="autoplay"
                        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/users/210074787&color=%2318a2d8&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
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
