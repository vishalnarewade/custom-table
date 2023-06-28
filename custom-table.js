class customTable {
    constructor (w, h, options) {
        this.width = w || 500;
        this.height = h || 300;
        this.options = options;
        this.table = null;
        this.container = null;
        this.onInit();
    }

    onInit() {
        this.container = document.createElement('section');
        document.body.appendChild(this.container);
        
        if (this.options.search) this.generateSearch();
        
        this.generateTable();

        // if (this.options.pagination) this.generateFooter();
    }

    generateSearch() {
        let input = document.createElement('input');
        input.addEventListener('keyup', this.searchData.bind(this));

        this.container.appendChild(input);
    }

    // generateFooter() {
    //     let footer = document.createElement('footer');

    //     let footerSummary = document.createElement('div');
    //     footerSummary.innerHTML = `<div role="status" aria-live="polite" title="Page 1 of 1">
    //         Showing 
    //         <b>1</b> 
    //         to 
    //         <b>2</b> 
    //         of 
    //         <b>2</b> 
    //         results
    //     </div>`;
        
    //     let footerPages = document.createElement('div');
    //     let buttonsPrev = document.createElement('button');
    //     let buttonsCurr = document.createElement('button');
    //     let buttonsNext = document.createElement('button');

    //     buttonsPrev.textContent = 'previous';
    //     buttonsCurr.textContent = '1';
    //     buttonsNext.textContent = 'next';

    //     footerPages.appendChild(buttonsPrev);
    //     footerPages.appendChild(buttonsCurr);
    //     footerPages.appendChild(buttonsNext);

    //     footer.appendChild(footerSummary);
    //     footer.appendChild(footerPages);

    //     this.container.appendChild(footer);
    // }

    searchData(e) {
        this.container.getElementsByTagName('tbody')[0].remove();

        let textReg = new RegExp(e.target.value, 'i');
        let data = this.options.data.filter(x => textReg.test(x))

        this.generateBody(data);
    }

    generateTable() {
        let table = document.createElement('table');
        this.table = table;
        
        if (this.options.header) this.generateHeader()
        if (this.options.data) this.generateBody(this.options.data);

        this.container.appendChild(table);
    }

    generateHeader() {
        let thead = document.createElement('thead');

        for (let i = 0; i < this.options.header.length; i++) {
            let th = this.generateTh(this.options.header[i]);
            thead.appendChild(th);
        }

        this.table.appendChild(thead);
    }
    
    generateBody(data) {
        let tbody = document.createElement('tbody');

        for (let i = 0; i < data.length; i++) {
            let tr = this.generateTr(data[i]);
            tbody.appendChild(tr);
        }

        this.table.appendChild(tbody);
    }

    generateTh(data) {
        let th = document.createElement('th');
        let td = this.generateTd(data);

        th.appendChild(td);
        return th;
    }

    generateTr(dataRow) {
        let tr = document.createElement('tr');
        for (let i = 0; i < dataRow.length; i++) {
            let td = this.generateTd(dataRow[i]);
            tr.appendChild(td);
        }

        return tr;
    }

    generateTd(value) {
        let td = document.createElement('td');
        td.innerHTML = value;

        return td;
    }
}