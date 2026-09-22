export const HOST_RELEASE = "rust-v0.155.1";

export const HOST_ASSETS = {
	"darwin-arm64": [
		"codex-code-mode-host-aarch64-apple-darwin.tar.gz",
		"e8957108eebd70963b0906857ceb7f7a2b477d1972a7147041c625d4071b508a",
	],
	"darwin-x64": [
		"codex-code-mode-host-x86_64-apple-darwin.tar.gz",
		"4d1d2377a39842c13fa07c70e2ddd1592ff4edc4846cf32ce90df07f5568066a",
	],
	"linux-arm64": [
		"codex-code-mode-host-aarch64-unknown-linux-musl.tar.gz",
		"516f2ed76d4ae96c2074d3c08f4576ed1bdc5c3a97e26734d7319de8b6861683",
	],
	"linux-x64": [
		"codex-code-mode-host-x86_64-unknown-linux-musl.tar.gz",
		"9fd083743af55be818aceb351d371fb5136f5b6aa3938f167087373d27067b2d",
	],
	"win32-arm64": [
		"codex-code-mode-host-aarch64-pc-windows-msvc.exe",
		"e6ad0719748f70e4c68413c02fe2b6dd5d2338e800e1f5c67678df202edb97d2",
	],
	"win32-x64": [
		"codex-code-mode-host-x86_64-pc-windows-msvc.exe",
		"480da4a9a98b5b54d6656d731fbcc00c73fd4d0fc4b9aaceafc9fbdf08a7d523",
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
