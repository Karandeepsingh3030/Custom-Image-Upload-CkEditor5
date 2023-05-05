class MyUploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then(file => {
            return new Promise((resolve, reject) => {
                const formData = new FormData();
                formData.append('file', file);
            
                fetch('/Viewlift API URL', {
                    method: 'POST',
                    body: formData
                })
                .then(response => {
                    if (response.ok) {
                        resolve({
                            default : response.url
                            // default: "https://www.hindustantimes.com/ht-img/img/2023/02/15/1600x900/Death_Note_is_usually_the_first_anime__1676437361142_1676437361490_1676437361490.jpg"
                        });
                    } else {
                        reject(response.statusText);
                    }
                })
                .catch(error => {
                    reject(error.message);
                });
            });
        });
    }
}



CKEDITOR.ClassicEditor.create(document.getElementById("editor"), {
    // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html#extended-toolbar-configuration-format
    // ckfinder : {
    //     uploadUrl : `https://api.cloudinary.com/v1_1/charchit/:resource_type/upload?upload_preset=my_preset&api_key=132441711661837`,
    //     // upload: {
    //     //     options: {
    //     //         uploadKey: 'file'
    //     //     }
    //     // }
    // },
    // // uploadAdapter: {
    // //     uploadUrl: `https://api.cloudinary.com/v1_1/charchit/image/upload?apiKey=132441711661837&apiSecret=ruR3hk5hNh2m0RSj_QCPgnBob5w&
    // //     secretKey=I36Vo3CHB5ufWTxDyXHdRTmtLIcil1/Zv6lFs83J`,
    // // },
    options: {
        resourceType: 'Images',
        opener: "popup"
    },
    // plugins : ["ImageUpload"], 
    toolbar: {
        items: [
            'ckfinder', '|', 'exportPDF', 'exportWord', '|',
            'findAndReplace', 'selectAll', '|',
            'heading', '|',
            'bold', 'italic', 'strikethrough', 'underline', 'code', 'subscript', 'superscript', 'removeFormat', '|',
            'bulletedList', 'numberedList', 'todoList', '|',
            'outdent', 'indent', '|',
            'undo', 'redo',
            '-',
            'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor', 'highlight', '|',
            'alignment', '|',
            'link', 'insertImage', 'blockQuote', 'insertTable', 'mediaEmbed', 'codeBlock', 'htmlEmbed', '|',
            'specialCharacters', 'horizontalLine', 'pageBreak', '|',
            'textPartLanguage', '|',
            'sourceEditing','imageUpload'
        ],
        shouldNotGroupWhenFull: true
    },
    list: {
        properties: {
            styles: true,
            startIndex: true,
            reversed: true
        }
    },
    heading: {
        options: [
            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
            { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
            { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
        ]
    },
    placeholder: 'Welcome to CKEditor 5!',
    fontFamily: {
        options: [
            'default',
            'Arial, Helvetica, sans-serif',
            'Courier New, Courier, monospace',
            'Georgia, serif',
            'Lucida Sans Unicode, Lucida Grande, sans-serif',
            'Tahoma, Geneva, sans-serif',
            'Times New Roman, Times, serif',
            'Trebuchet MS, Helvetica, sans-serif',
            'Verdana, Geneva, sans-serif'
        ],
        supportAllValues: true
    },
    fontSize: {
        options: [10, 12, 14, 'default', 18, 20, 22],
        supportAllValues: true
    },
    htmlSupport: {
        allow: [
            {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true
            }
        ]
    },
    htmlEmbed: {
        showPreviews: true
    },
    link: {
        decorators: {
            addTargetToExternalLinks: true,
            defaultProtocol: 'https://',
            toggleDownloadable: {
                mode: 'manual',
                label: 'Downloadable',
                attributes: {
                    download: 'file'
                }
            }
        }
    },
    mention: {
        feeds: [
            {
                marker: '@',
                feed: [
                    '@apple', '@bears', '@brownie', '@cake', '@cake', '@candy', '@canes', '@chocolate', '@cookie', '@cotton', '@cream',
                    '@cupcake', '@danish', '@donut', '@dragée', '@fruitcake', '@gingerbread', '@gummi', '@ice', '@jelly-o',
                    '@liquorice', '@macaroon', '@marzipan', '@oat', '@pie', '@plum', '@pudding', '@sesame', '@snaps', '@soufflé',
                    '@sugar', '@sweet', '@topping', '@wafer'
                ],
                minimumCharacters: 1
            }
        ]
    },
    removePlugins: [
        'CKBox',
        'EasyImage',
        'RealTimeCollaborativeComments',
        'RealTimeCollaborativeTrackChanges',
        'RealTimeCollaborativeRevisionHistory',
        'PresenceList',
        'Comments',
        'TrackChanges',
        'TrackChangesData',
        'RevisionHistory',
        'Pagination',
        'WProofreader',
        'SlashCommand',
        'Template',
        'DocumentOutline',
        'FormatPainter',
        'TableOfContents'
    ]
}).then(editor => {

    editor.plugins.get('FileRepository').createUploadAdapter = function(loader) {
        return new MyUploadAdapter(loader);
    };
    editor.plugins.get('ImageUpload').on('fileUploadRequest', function(event) {
        console.log('File upload requested:', event);
    });
    editor.plugins.get('ImageUpload').on('fileUploadResponse', function(event) {
        console.log('File upload response received:', event);
    });

    //   editor.addCommand('custom_command', {
    //     execute: function(edt) {
    //         edt.insertHtml("<h3>Hello Welcome to <a href='https://impulsivecode.com/'>impulsivecode</a></h3>");

    //     }


    // it's working
    // editor.commands.add('myCommand', {
    //     execute: () => {
    //       // Handle the button click event
    //       console.log('Button clicked!');
    //     },
    //     isEnabled: true
    //   });

    // const ButtonView = editor.require('ui/button/buttonview');
    // // Create the button UI element      
    // const buttonView = new ButtonView('myCustomButton');
    // buttonView.set({
    //     label: 'My Button',
    //     icon: `<svg width="100" height="100">
    //       <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
    //     </svg>`,
    //     tooltip: true
    // });
    // buttonView.on('execute', () => {
    //     console.log('Button clicked!');
    // });
    // editor.ui.componentFactory.add('myCustomButton', locale => buttonView);

    // Add the button to the toolbar
    //   editor.ui.componentFactory.add('myButton', () => {
    //     return button;
    //   });
    
    // editor.model.document.on('change:selection', (eventInfo, batch) => {
    //     debugger
    //     const selection = editor.model.document.selection;
    //     const selectedElement = selection.getSelectedElement();
      
    //     if (selectedElement && selectedElement.is('image')) {
    //       console.log('Selected image:', selectedElement);
    //     }
    //   });

    // const imageUploadPlugin = editor.plugins.get('ImageUpload');
    // debugger
    // // Subscribe to the uploadImage event
    // imageUploadPlugin.editor.model.document.selection.on('change:range', (evt, res) => {
    //     // const selection = editor.model.document.selection;
    //     // const selectedElement = selection.getSelectedElement();
    //     const content = editor.getData();
    //   // Handle the event
    //   debugger
    // });
    //it's working
    // editor.model.document.selection.on('change:range', (event, data) => {
    // });
    // editor.model.document.selection.on('change:isEnabled', (event, data) => {
    // });








    // editor.editing.view.document.on('selectionChange', () => {
    //     const selection = editor.model.document.selection;
    //     const selectedElement = selection.getFirstPosition().parent;
    //     if (selectedElement && selectedElement.is('element', 'image')) {
    //         // Get the selected content and call your custom function here.
    //         const selectedContent = selection.getSelectedHtml();
    //         console.log('Selected content:', selectedContent);
    //     }
    // });
})