export default {
    provider: 'local',
    options: {
        locales: {
            root: {  // root 表示默认语言
                translations: {
                    button: {
                        buttonText: '搜索',           // 搜索按钮文字
                        buttonAriaLabel: '搜索'
                    },
                    modal: {
                        noResultsText: '没有找到相关结果',  // 无结果提示
                        resetButtonTitle: '清除',
                        footer: {
                            selectText: '选择',
                            selectKeyAriaLabel: '选择',
                            navigateText: '导航',
                            navigateUpKeyAriaLabel: '向上导航',
                            navigateDownKeyAriaLabel: '向下导航',
                            closeText: '关闭',
                            closeKeyAriaLabel: '关闭',
                            searchByText: '搜索'
                        }
                        // ... 其他翻译
                    }
                }
            }
        }
    }
}
