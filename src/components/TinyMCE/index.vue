 <template>
    <div>
        <editor
            ref="editor"
            api-key="1cvljup72sa0e27wxi67ov3qm5kxac1u56bvp9hihohdr8bc"
            v-model="content"
            :init="fullPlugin"
        ></editor>
    </div>
</template>

 <script>
import Editor from "@tinymce/tinymce-vue";

export default {
    props: ["content", "initialValue", "height"],
    components: {
        editor: Editor
    },
    watch: {
        value(val) {
            this.$emit("update:content", val);
        },
        content(val) {
            this.value = this.content;
        }
    },
    data() {
        let token = this.$store.getters.tiny_drive_token;
        let height = this.height;
        return {
            value: "",
            fullPlugin: {
                tinydrive_token_provider: function(success) {
                    success({
                        token
                    });
                },
                height,
                selector: "textarea",
                tinydrive_dropbox_app_key: "pgpbcjipdzj0e78",
                // language_url: `/tinymce/langs/vi.js`,
                // language: "vi",
                menubar: "edit view insert format tools table tc help",
                plugins:
                    "print preview fullpage powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap  mentions quickbars linkchecker emoticons",
                toolbar:
                    "bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview print  insertfile image media pageembed link  ltr rtl"
            }
        };
    },

    created() {}
};
</script>
<style lang="css">
</style>
