# Security Policy

## Reporting a vulnerability

Please report security issues **privately**. Don't open a public GitHub issue for anything security-sensitive.

- Preferred: open a [private security advisory](https://github.com/dominikkoenitzer/Spectrum/security/advisories/new) on this repository.
- Alternatively: email **dominikkoenitzer@users.noreply.github.com** with the details.

Please include:

- a description of the issue and its impact,
- steps to reproduce (a URL, request, or minimal example), and
- any relevant logs, screenshots, or proof of concept.

## What to expect

- An acknowledgement of your report, typically within a few days.
- An assessment and, where applicable, a fix deployed to the live site.
- Credit for the report if you would like it, once the issue is resolved.

## Scope

Spectrum is a set of **client-side colour tools**. There is no account and no database. Images dropped into the picker or the colour-blindness simulator are read into a canvas in the browser and never uploaded; recent colours live in the visitor's own `localStorage`.

Reports most relevant to this project:

- **An image that leaves the device**, or any path where a pasted URL causes a request that carries more than the image itself.
- **Content injection** through a pasted colour value, an image filename, or a URL parameter.
- **Anything that reads the visitor's `localStorage`** from another origin or an embedded context.
- **Dependency vulnerabilities** with a plausible path to the browser. The image and colour maths runs entirely on the client, so a compromised parser is reachable.

Contrast or colour-accuracy mistakes are welcome as ordinary bug reports rather than security ones, with one exception: the contrast checker is an accessibility tool, and a ratio it reports **too high** is a correctness bug worth reporting properly.
