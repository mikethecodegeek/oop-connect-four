export default class ColumnWinInspector {
    constructor(columnObject) {
        this.columnOblect = columnObject;
    }

    inspect () {
        for (let i = 0; i < 3; i++) {
            if (columnObject.tokens[i] === columnObject.tokens[i + 1] &&
                columnObject.tokens[i] === columnObject.tokens[i + 2] &&
                columnObject.tokens[i] === columnObject.tokens[i + 3]) {
                return columnObject.tokens[i];
            }
        }
        return 0;
    }
}
