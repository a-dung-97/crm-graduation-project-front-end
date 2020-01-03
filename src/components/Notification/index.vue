<template>
    <div>
        <el-popover
            @hide="params.offset=0;notifications=[];noMore=false"
            class="popover"
            popper-class="popover-custom"
            placement="bottom-end"
            width="400"
            trigger="click"
        >
            <div class="header">
                <span class="title">Thông báo</span>
            </div>
            <div
                class="body"
                v-infinite-scroll="load"
                infinite-scroll-disabled="disabled"
                v-loading="loading"
            >
                <div
                    @click="$router.push(item.link)"
                    class="notification"
                    v-for="item in notifications"
                    :key="item.id"
                >
                    <div class="content">{{ item.type }}: {{ item.data }}</div>
                    <div class="time">
                        <i class="el-icon-time"></i>
                        <span>{{ item.created_at }}</span>
                    </div>
                </div>
            </div>
            <a class="link all" type="primary">Xem tất cả</a>
            <i slot="reference" @click="open" class="el-icon-message-solid notification-icon"></i>
        </el-popover>
        <div :class="{'badge':true,'hidden':unreadCount==0}">
            <span>{{ unreadCount }}</span>
        </div>
    </div>
</template>
<script>
import { getNotifications, markAsRead } from "@/api/company/user";
export default {
    data() {
        return {
            notifications: [],
            unreadCount: 0,
            loading: false,
            noMore: false,
            params: {
                offset: 0
            }
        };
    },
    computed: {
        disabled() {
            return this.noMore;
        }
    },
    methods: {
        load() {
            this.params.offset += 6;
            this.getNotifications();
        },
        async getNotifications() {
            try {
                this.loading = true;
                const { data, unread } = await getNotifications(this.params);
                if (data.length == 0) this.noMore = true;
                else this.notifications = this.notifications.concat(data);
                this.unreadCount = unread;
                this.loading = false;
            } catch (error) {
                this.loading = false;
            }
        },
        open() {
            this.unreadCount = 0;
            this.params.offset = 0;
            this.notifications = [];
            this.getNotifications();
            markAsRead();
        },
        receiveNotification() {
            Echo.private("App.User." + this.$store.getters.id).notification(
                notification => {
                    this.unreadCount++;
                    console.log(notification);

                    if (!("Notification" in window)) {
                        alert("Web Notification is not supported");
                        return;
                    }
                    Notification.requestPermission(permission => {
                        let noti = new Notification(notification.obj_type, {
                            body: notification.name,
                            icon:
                                process.env.VUE_APP_BASE +
                                "static/img/sidebar-logo.1c9c4608.png"
                        });
                        noti.onclick = () => {
                            this.$router.push(notification.link);
                        };
                    });
                }
            );
        }
    },
    created() {
        this.receiveNotification();
        this.getNotifications();
    }
};
</script>
<style lang="scss" scoped>
.notification-icon {
    margin-top: 14px;
    color: #2980b9;
}
.badge {
    font-size: 12px;
    font-weight: bold;
    color: white;
    background: #e17055;
    position: relative;
    text-align: center;
    width: 18px;
    border-radius: 50%;
    height: 18px;
    top: 1px;
    right: 19px;
    display: inline-block;
    // visibility: hidden;
    span {
        position: relative;
        color: #ecf0f1;
        bottom: 16px;
    }
}
.hidden {
    visibility: hidden;
}
.header {
    padding: 10px;
    .title {
        font-weight: bold;
    }
    a {
        float: right;
    }
}
.notification {
    border-top: 1px solid #cfd8dc;
    padding: 10px 15px;
    cursor: pointer;
    &:hover {
        background: #bbdefb;
    }
}
.all {
    display: block;
    text-align: center;
    margin-bottom: 10px;
}
.body {
    margin-bottom: 15px;
    overflow-y: auto;
    height: 285px;
}
.content {
    font-size: 14px;
}
.time {
    color: #9e9e9e;
    font-size: 12px;
}
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    // background-color: #ecf0f1 !important;
}

::-webkit-scrollbar {
    width: 4px;
    background-color: #f5f5f5 !important;
}
</style>