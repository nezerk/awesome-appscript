function sortBalanceSheetColumnsByDate() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const headerRow = 5;
  const startCol = 4; // Column D
  const endCol = 24;  // Column X
  const numCols = endCol - startCol + 1;
  
  // Get the date row and full column blocks
  const dateRow = sheet.getRange(headerRow, startCol, 1, numCols).getValues()[0];
  const dataRange = sheet.getRange(headerRow, startCol, sheet.getMaxRows() - headerRow + 1, numCols);
  const data = dataRange.getValues();

  // Combine column-wise data with their date
  const columns = [];
  for (let i = 0; i < numCols; i++) {
    const colData = [];
    for (let j = 0; j < data.length; j++) {
      colData.push(data[j][i]);
    }
    columns.push({ date: new Date(dateRow[i]), data: colData });
  }

  // Sort columns by date ascending
  columns.sort((a, b) => a.date - b.date);

  // Write back the sorted columns
  for (let i = 0; i < columns.length; i++) {
    for (let j = 0; j < columns[i].data.length; j++) {
      sheet.getRange(headerRow + j, startCol + i).setValue(columns[i].data[j]);
    }
  }
}
