import fs from "node:fs";
let lastLogFileNumber = 0;
export function logToFile(...messages: string[]) {
	fs.open(`./log${lastLogFileNumber++}.txt`, "w", (err, fd) => {
		if (err) console.log(err);
		else {
			for (let msg of messages) {
				fs.writeFile(fd, msg + "\n", (err) => console.log(err));
			}
			fs.close(fd);
		}
	});
}
