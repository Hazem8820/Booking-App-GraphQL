const isAuthorized = async (role, userRole) => {
    if (role !== userRole) throw new Error('User is Not Authorized', { cause: 403 })
    return;
}

export default isAuthorized