function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
    .setTitle('Premium Hunt Tracker')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

var SPREAD_SHEET_ID = '1hzjAhroma0VYsqQp0Xjti5Qh_Vjjha1WA2iLtURLtVQ';
var HUNT_TYPE_SHEET = 'HuntType';
var DEVICE_NAME_SHEET = 'DeviceName';
var COMMUNICATED_OFFER_SHEET = 'CommunicatedOffer';
var TERRITORY_NAME_SHEET = 'TerritoryName';
var LSP_NAME_SHEET = 'LSPName';
var THANA_NAME_SHEET = 'ThanaName';
var TL_NAME_SHEET = 'TLName';

var RECORD_KEEPING_SPREAD_SHEET_ID = '1XhCVUDi81MY2AL1OVgL_kvx_JT_tIbQSIBXfxvPCtgs'
var RECORD_KEEPING_SPREAD_SHEET_NAME = 'RFH'

function getHuntTypeOptions() {
  var spreadsheetId = SPREAD_SHEET_ID; // Replace with your correct spreadsheet ID
  var sheetName = HUNT_TYPE_SHEET;
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var values = sheet.getDataRange().getValues();
  var options = values.slice(1).flat(); // Exclude header row
  return options;
}

function getDeviceNameOptions() {
  var spreadsheetId = SPREAD_SHEET_ID; // Replace with your correct spreadsheet ID
  var sheetName = DEVICE_NAME_SHEET;
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var values = sheet.getDataRange().getValues();
  var options = values.slice(1).flat(); // Exclude header row
  return options;
}

function getCommunicatedOfferOptions() {
  var spreadsheetId = SPREAD_SHEET_ID; // Replace with your correct spreadsheet ID
  var sheetName = COMMUNICATED_OFFER_SHEET;
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var values = sheet.getDataRange().getValues();
  var options = values.slice(1).flat(); // Exclude header row
  return options;
}

function getTerritoryNameOptions() {
  var spreadsheetId = SPREAD_SHEET_ID; // Replace with your correct spreadsheet ID
  var sheetName = TERRITORY_NAME_SHEET;
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var values = sheet.getDataRange().getValues();
  var options = values.slice(1).flat(); // Exclude header row
  return options;
}

// Function to get LSP name options based on selected territory
function getLSPNameOptions(territory) {
  var spreadsheetId = SPREAD_SHEET_ID; // Replace with your correct spreadsheet ID
  var sheetName = LSP_NAME_SHEET;
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var territoryColumnIndex = getTerritoryColumnIndex(territory);
  var values = sheet.getDataRange().getValues();
  var options = [];

  // Iterate over each row in the sheet
  for (var i = 1; i < values.length; i++) { // Start from index 1 to skip header row
    var lspName = values[i][territoryColumnIndex - 1]; // Adjust column index to 0-based
    if (lspName) { // Exclude empty values
      options.push(lspName);
    }
  }
  return options;
}

// Function to get the column index based on the selected territory
function getTerritoryColumnIndex(territory) {
  var spreadsheetId = SPREAD_SHEET_ID; // Replace with your correct spreadsheet ID
  var sheetName = LSP_NAME_SHEET;
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var lastColumn = Math.min(sheet.getLastColumn(), 20); // Limit to a maximum of 20 columns

  // Iterate over header row to find the column index of the selected territory
  for (var columnIndex = 1; columnIndex <= lastColumn; columnIndex++) {
    var territoryName = sheet.getRange(1, columnIndex).getValue();
    if (territoryName === territory) {
      return columnIndex;
    }
  }

  // If territory not found, return -1 or handle accordingly
  return -1;
}

// Function to get Thana options based on selected LSP Name
function getThanaNameOptions(lspName) {
  var spreadsheetId = SPREAD_SHEET_ID; // Replace with your correct spreadsheet ID
  var sheetName = THANA_NAME_SHEET;
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var lspNameColumnIndex = getLSPNameColumnIndex(lspName);
  var values = sheet.getDataRange().getValues();
  var options = [];

  // Iterate over each row in the sheet
  for (var i = 1; i < values.length; i++) { // Start from index 1 to skip header row
    var thana = values[i][lspNameColumnIndex - 1]; // Adjust column index to 0-based
    if (thana) { // Exclude empty values
      options.push(thana);
    }
  }
  return options;
}

// Function to get the column index based on the selected LSP Name
function getLSPNameColumnIndex(lspName) {
  var spreadsheetId = SPREAD_SHEET_ID; // Replace with your correct spreadsheet ID
  var sheetName = THANA_NAME_SHEET;
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var lastColumn = Math.min(sheet.getLastColumn(), 100); // Limit to a maximum of 100 columns

  // Iterate over first row to find the column index of the selected LSP Name
  for (var columnIndex = 1; columnIndex <= lastColumn; columnIndex++) {
    var name = sheet.getRange(1, columnIndex).getValue();
    if (name === lspName) {
      return columnIndex;
    }
  }

  // If LSP Name not found, return -1 or handle accordingly
  return -1;
}

function getTLNameOptions() {
  var spreadsheetId = SPREAD_SHEET_ID; // Replace with your correct spreadsheet ID
  var sheetName = TL_NAME_SHEET;
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var values = sheet.getDataRange().getValues();
  var options = values.slice(1).flat(); // Exclude header row
  return options;
}


// Function to submit form data to "recordsForHunt" sheet
/**
* @param {Object[]} formData
*/
function submitFormData(...formData) {
  var spreadsheetId = RECORD_KEEPING_SPREAD_SHEET_ID; // Replace with your correct record keeping spreadsheet ID
  var sheetName = RECORD_KEEPING_SPREAD_SHEET_NAME;
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName(sheetName);
  var timestamp = new Date();

  // Get the last row with content in the sheet
  var lastRow = sheet.getLastRow();

  // Append timestamp as the first column
  sheet.getRange(lastRow + 1, 1).setValue(timestamp);

  // Append form data starting from the second column
  sheet.getRange(lastRow + 1, 2, 1, formData.length).setValues([formData]);

}

// console.log(getCommunicatedOfferOptions())