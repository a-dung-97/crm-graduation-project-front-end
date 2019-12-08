export default {
    methods: {
        checkEditor(field) {
            if (
                field == "" ||
                field ==
                "<!DOCTYPE html>\n<html>\n<head>\n</head>\n<body>\n\n</body>\n</html>"
            ) {
                this.$message.error("Bạn chưa nhập nội dung");
                return false;
            }
            return true;

        },
    }
}