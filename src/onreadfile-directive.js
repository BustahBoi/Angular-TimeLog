/* jshint undef: false, unused: false, esversion: 6, asi: true */
class OnReadFile {
    constructor($parse) {
        this.restrict = 'A'
        this.parse = $parse
    }

    link(scope, element, attrs) {
        let fn = this.parse(attrs.onReadFile)
        element.on('change', function(changeEvent) {
            let files = changeEvent.target.files
			for (let i = 0; i != files.length; ++i) {
				let f = files[i]
				let reader = new FileReader()
				let name = f.name
				reader.onload = function(e) {
					let data = e.target.result				
					let workbook = XLSX.read(data, {type : 'binary'})
					
					scope.fileContent = workbook
					fn(scope)
					scope.$apply()
				}			
				reader.readAsBinaryString(f)
			}
        })
    }

    static directiveFactory($parse) {
        OnReadFile.instance = new OnReadFile($parse)
        return OnReadFile.instance
    }
}

OnReadFile.directiveFactory.$inject = ['$parse']

