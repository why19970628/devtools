# Security Policy

## Philosophy

DevTools is a **100% client-side** application. No data is ever uploaded to a server: everything runs in your browser, and nothing is transmitted anywhere. This is a core design guarantee, not an afterthought.

## Supported versions

Only the latest release is supported. Please always run the current `main` build.

## Reporting a vulnerability

If you find a security issue — for example a tool that sends data somewhere it shouldn't, or renders untrusted input in an unsafe way — please report it privately:

- Open a [private security advisory](https://github.com/why19970628/devtools/security/advisories/new), or
- Email the maintainers (see the project page), or
- File an issue with the label `security` if it is not sensitive.

Please do **not** post the issue publicly before it is addressed.

## What we ask for

- A clear description of the bug and the affected tool/page.
- Steps to reproduce, ideally a minimal input.
- Any suggested fix (optional).

## What you can expect

- Acknowledgment within 3 business days.
- A fix or mitigation, and credit to the reporter (if you want it) in the release notes.