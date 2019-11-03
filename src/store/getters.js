const getters = {
    sidebar: state => state.app.sidebar,
    device: state => state.app.device,
    token: state => state.user.token,
    id: state => state.user.id,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
    phone_number: state => state.user.phone_number,
    position: state => state.user.position,
    department: state => state.user.department,
    email: state => state.user.email,
    permission_routes: state => state.permission.routes
}
export default getters
