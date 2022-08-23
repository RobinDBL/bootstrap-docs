// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HttpService } from './services/http.service';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
	
	
	
	const httpService: HttpService = new HttpService();
	let components = await (await httpService.getComponents()).map(
		component => {
			return {
				label: component.name,
				url: component.url,
			};
		}
	);
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('bootstrap-docs.search-bootstrap-docs', async () => {
		const component = await vscode.window.showQuickPick(components, {
			matchOnDetail: true
		});
	
		if (component == null){
			return;
		}
	
		const uri = vscode.Uri.parse(component.url!);
		vscode.env.openExternal(uri);
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
