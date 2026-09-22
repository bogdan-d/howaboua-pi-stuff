export const HOST_RELEASE = "rust-v0.156.0";

export const HOST_ASSETS = {
	"darwin-arm64": [
		"codex-code-mode-host-aarch64-apple-darwin.tar.gz",
		"77e47e9f00820566b2d6e25bfcc1890c1a6eb10a8a0b0a178dcc0b37127739ee",
	],
	"darwin-x64": [
		"codex-code-mode-host-x86_64-apple-darwin.tar.gz",
		"1166a934f1b1e19050cc0f3851bbb9447ad9af0992b880838a5b378da259756c",
	],
	"linux-arm64": [
		"codex-code-mode-host-aarch64-unknown-linux-musl.tar.gz",
		"d8265a45e207b341fd5e722628e199ac52dd35435a67cea3e5ea246420f8e6b0",
	],
	"linux-x64": [
		"codex-code-mode-host-x86_64-unknown-linux-musl.tar.gz",
		"8383c79b0b6b4f77f01a1ca548fe1d550ad96a6e91b9fc1180bb69a449cae53b",
	],
	"win32-arm64": [
		"codex-code-mode-host-aarch64-pc-windows-msvc.exe",
		"ae26c6cfd80c9d0bf05a60f66bcbdba305b0847598e7ee7f19e33135435d19ed",
	],
	"win32-x64": [
		"codex-code-mode-host-x86_64-pc-windows-msvc.exe",
		"85920859fc1883012af1cffff878141d860e94178a6e1318dfca22192c681f21",
	],
} as const;

export function codeModeHostBinaryName(platform: string): string {
	return platform === "win32" ? "codex-code-mode-host.exe" : "codex-code-mode-host";
}

export function resolveCodeModeHostAsset(platform: string, arch: string): readonly [string, string] {
	const asset = (HOST_ASSETS as Record<string, readonly [string, string]>)[`${platform}-${arch}`];
	if (!asset) throw new Error(`Unsupported code-mode platform: ${platform}-${arch}`);
	return asset;
}

export function hostAssetUrl(assetName: string): string {
	return `https://github.com/openai/codex/releases/download/${HOST_RELEASE}/${assetName}`;
}
