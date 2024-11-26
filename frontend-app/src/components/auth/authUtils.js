import axios from "axios";
import {AUTH} from "./auth.secret";
import {ST} from "../../connect/secret";
function remapRole(t) {
    if (t === AUTH.ADMIN) {
        return 'admin'
    }
    else if (t === AUTH.CASHIER) {
        return 'cashier'
    } else {
        return AUTH.NONE
    }
}
function mapRole(role) {
    let roleId;
    if (role === 'admin') {
        roleId = AUTH.ADMIN
    }
    else if (role === 'cashier') {
        roleId = AUTH.CASHIER
    } else {
        roleId = AUTH.NONE
    }
    return roleId
}
export const getUserRole = async (roleAware) => {
    const accessToken = roleAware.withToken()
    const userId = roleAware.withSub()
    if (!accessToken) {
        console.log('no token')
        return []
    }
    if (!userId) {
        console.log('no id')
        return []
    }
    try {
        const response = await axios.get(`${ST.HOST_URL}/auth/roles`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const obj = JSON.parse(response.data.data)
        return obj.map(t=>remapRole(t.id))[0]
    } catch (error) {
        console.error("Error fetching user roles:", error.response?.data || error.message);
    }
};

export const assignUserRole = async (roleAware, role) => {
    const accessToken = roleAware.withToken()
    if (!accessToken) {
        console.log('no token')
        return []
    }
    if (!role) {
        console.log('no role')
        return []
    }

    const roleId = mapRole(role)
    const prevRole = await getUserRole(roleAware)
    console.log(`prev: ${prevRole}` )
    console.log(roleId)
    const prevRoleId = mapRole(prevRole)

    try {
        console.log(accessToken)


        const response2 = await axios.delete(
            `${ST.HOST_URL}/auth/roles`,
            {
                    data: { role: prevRoleId },
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    }
                }
        );

        const response = await axios.post(
            `${ST.HOST_URL}/auth/roles`,
            { role: roleId },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("Roles assigned successfully:", response.data);

        console.log("Roles deleted successfully:", response2.data);
    } catch (error) {
        console.error("Error assigning roles:", error.response?.data || error.message);
    }
};

export const removeUserRole = async (roleAware, role) => {
    const domain = AUTH.REACT_APP_AUTH0_DOMAIN;
    const accessToken = roleAware.withToken()
    const userId = roleAware.withSub()
    const roleId = mapRole(role)
    try {
        const response = await axios.delete(
            `https://${domain}/api/v2/users/${userId}/roles`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                data: { roles: [roleId] },
            }
        );
        console.log("Roles removed successfully:", response.data);
    } catch (error) {
        console.error("Error removing roles:", error.response?.data || error.message);
    }
};