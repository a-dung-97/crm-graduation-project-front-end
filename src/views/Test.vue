 <template>
    <div id="app">
        <button @click="addText"></button>
        <editor
            style="width:900px"
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
    name: "Test",
    components: {
        editor: Editor
    },
    data() {
        return {
            content: "Hello",
            fullPlugin: {
                tinydrive_token_provider: function(success) {
                    success({
                        token:
                            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxIiwibmFtZSI6Ik5ndXlcdTFlYzVuIEFuaCBEXHUwMTY5bmciLCJodHRwczpcL1wvY2xhaW1zLnRpbnkuY2xvdWRcL2RyaXZlXC9yb290IjoiXC8xIiwiZXhwIjoxNTc1OTI2ODA1fQ.d7DUImiao7NfjbMXpnUdys7c0qrxRgnVoSFg4wv-AIgvpxLshglo_hn-n_uxUMHUHArrU0R-vqBiAI7dRPg3Uw_6-7H7-v-Qzbqjr-e6TkOKa6WQmz1GfUfXQGxEH6sDrBtwSARbzKxbqWphH5qcqiEjAG-mMrYXDj0LmVnzgjZAVqqxzhzseYFLW-sBzgiw_YPOXrWzc1t5OJAD0JVci9-R7QrNTBcq3aaLHLcGs5AMjtJSJqYvzq6HHkCIInmlZBXYZgOdP_YbA_N8ysRoB05aRnuX7Lk8oHYmWfhLbOZzdCo97VY5L98aF-B-UzBWuA4qXfvS-oMl8suokGg4FA"
                    });
                },
                selector: "textarea",
                tinydrive_dropbox_app_key: "pgpbcjipdzj0e78",
                menubar: "edit view insert format tools table tc help",
                plugins:
                    "print preview fullpage powerpaste casechange importcss tinydrive searchreplace autolink autosave save directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount a11ychecker imagetools textpattern noneditable help formatpainter permanentpen pageembed charmap  mentions quickbars linkchecker emoticons",
                toolbar:
                    "bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons | fullscreen  preview print  insertfile image media pageembed link  ltr rtl"
            }
        };
    },
    methods: {
        addText() {
            window.tinyMCE.execCommand(
                "mceInsertContent",
                false,
                "%receipent.user%"
            );
        }
    },
    created() {}
};
</script>
