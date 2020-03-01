const vscode = require('vscode');
const fs = require("fs");
const path = require("path");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('extension.criaHTML', function () {
		const folderPath = getCurrentWorkspaceFolder();
		if (!folderPath) {
			vscode.window.showErrorMessage('Selecione um workspace!');
			return;
		}

		fs.writeFile(path.join(folderPath, "index.html"), generateHTML(), err => {
			if (err) {
			  return vscode.window.showErrorMessage(
				"Falha na criação do arquivo HTML"
			  );
			}
			vscode.window.showInformationMessage(
				"HTML criado com sucesso"
			);
		});
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

function getCurrentWorkspaceFolder() {
	try {
		return vscode
			.workspace
			.workspaceFolders[0]
			.uri
			.toString()
			.split(":")[1];
	} catch (error) {
		console.error(error);
		return '';
	}
}

function generateHTML() {
	return (
		`<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<meta http-equiv="X-UA-Compatible" content="ie=edge" />
				<title>Meu HTML</title>
				<link rel="stylesheet" href="app.css" />
			</head>
			<body>
				<script src="app.js"></script>
			</body>
		</html>`
	);
}

module.exports = {
	activate,
	deactivate
}
