const getMenuFront = (role = 'USER_ROLE') => {

    const menu = [{
            titulo: 'Principal',
            icon: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/' },
                { titulo: 'ProgressBar', url: 'progress' },
                { titulo: 'Grafica', url: 'grafica1' },
                { titulo: 'Promesas', url: 'promesas' },
                { titulo: 'Rxjs', url: 'rxjs' },
            ]

        },
        {
            titulo: 'Mantenimiento',
            icon: 'mdi mdi-folder-lock-open',
            submenu: [
                { titulo: 'Hospitales', url: 'hospitales' },
                { titulo: 'Medicos', url: 'medicos' },
            ]

        }
    ];

    if (role === 'ADMIN_ROLE') {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: 'usuarios' })
    }
    return menu;
}

module.exports = {
    getMenuFront
}