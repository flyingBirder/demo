//富文本编辑器 

const { createEditor, createToolbar } = window.wangEditor
// 编辑器配置对象
const editorConfig = {
    // 占位符提示文字
    placeholder: 'Type here...',
    // 编辑器变化的时候的回调函数
    onChange(editor) {
        // 编辑器内容变化时，获取最新的HTML内容
        const html = editor.getHtml()
        // console.log('editor content', html)
        // 也可以同步到 <textarea>
        document.querySelector('.publish-content').value = html
    },
}
// 创建编辑器实例
const editor = createEditor({
    // 编辑器容器选择器  创建位置
    selector: '#editor-container',
    // 默认内容：初始HTML内容
    html: '<p><br></p>',
    // 配置项：编辑器配置对象
    config: editorConfig,
    // 编辑模式：默认模式（包含所有功能） / 简单模式（仅包含基础功能）
    mode: 'default', // or 'simple'
})
// 工具栏配置对象
const toolbarConfig = {}
// 创建工具栏实例
const toolbar = createToolbar({
    // 关联的编辑器实例 为指定编辑器创建工具栏
    editor,
    // 工具栏容器选择器  创建位置
    selector: '#toolbar-container',
    // 工具栏配置项：工具栏配置对象
    config: toolbarConfig,
    // 工具栏编辑模式：默认模式（包含所有功能） / 简单模式（仅包含基础功能）
    mode: 'default', // or 'simple'
})