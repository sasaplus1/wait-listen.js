/// <reference types="node" />
/// <reference types="node" />
/**
 * execute command
 *
 * @param {string} command - command string
 * @param {{ debug: boolean }} options - options
 * @returns {childProcess.ChildProcess}
 */
export function executeCommand(command: string, options?: {
    debug: boolean;
}): childProcess.ChildProcess;
/**
 * send request to URL
 *
 * @param {URL} url - URL
 * @returns {Promise<http.ServerResponse|Error>}
 */
export function sendRequest(url: URL): Promise<http.ServerResponse | Error>;
/**
 * wait for server to listen
 *
 * @param {{ interval: number, status: number, timeout: number, url: URL }} params - params
 * @returns {Promise<boolean>}
 */
export function waitListen(params?: {
    interval: number;
    status: number;
    timeout: number;
    url: URL;
}): Promise<boolean>;
import childProcess = require("node:child_process");
import http = require("node:http");
