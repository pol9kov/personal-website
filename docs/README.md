# Documentation Index

Complete documentation for the portfolio website project.

## 📚 Available Documentation

### For Developers

| Document                                 | Description                               | Audience     |
| ---------------------------------------- | ----------------------------------------- | ------------ |
| [../README.md](../README.md)             | Project overview, tech stack, quick start | Everyone     |
| [../CHANGELOG.md](../CHANGELOG.md)       | Version history and release notes         | Everyone     |
| [../ROADMAP.md](../ROADMAP.md)           | Project roadmap, milestones, current progress | Everyone |
| [../ARCHITECTURE.md](../ARCHITECTURE.md) | Technical architecture, design decisions  | Developers   |
| [../CONTRIBUTING.md](../CONTRIBUTING.md) | Contribution guidelines, commit format    | Contributors |
| [COMPONENTS.md](./COMPONENTS.md)         | Component documentation, props, patterns  | Developers   |

### For AI Assistants

| Document                                                 | Description                          | Usage                            |
| -------------------------------------------------------- | ------------------------------------ | -------------------------------- |
| [../CLAUDE.md](../CLAUDE.md)                             | AI coding rules and workflow         | Auto-loaded by Claude Code       |
| [TESTING-STRATEGY.md](./TESTING-STRATEGY.md)             | Test boundaries, not coverage (40-50%) | Reference when writing tests     |
| [CLAUDE-MD-OPTIMIZATION.md](./CLAUDE-MD-OPTIMIZATION.md) | Guide for optimizing CLAUDE.md files | Reference when updating AI rules |

## 🔗 Document Relationships

```
README.md (entry point)
├── CHANGELOG.md (version history)
├── ROADMAP.md (project milestones)
├── ARCHITECTURE.md (technical details)
├── CONTRIBUTING.md (contribution workflow)
├── CLAUDE.md (AI rules) ──┐
└── docs/                   │
    ├── README.md (this)    │
    ├── COMPONENTS.md (component guide)
    ├── TESTING-STRATEGY.md ←┤ (referenced in AI rules)
    └── CLAUDE-MD-OPTIMIZATION.md ←┘
```

## 📝 Documentation Standards

### When to Create New Documentation

- **New feature/architecture** → Update ARCHITECTURE.md
- **New workflow/process** → Update CONTRIBUTING.md
- **New AI rules** → Update CLAUDE.md
- **Meta documentation** → Add to docs/ with link from this index

### Documentation Checklist

When creating/updating documentation:

- [ ] Add entry to this index (docs/README.md)
- [ ] Link from relevant parent document
- [ ] Cross-reference related documents
- [ ] Update "Last Updated" date
- [ ] Test all links

### Anti-Patterns

❌ **Orphan documentation** - Files not linked from anywhere
❌ **Duplicate information** - Same content in multiple places
❌ **Broken links** - References to non-existent files
❌ **Outdated content** - No update dates or stale information

## 🔍 Quick Navigation

**Looking for:**

- Setup instructions? → [README.md](../README.md#-quick-start)
- Version history? → [CHANGELOG.md](../CHANGELOG.md)
- Code structure? → [ARCHITECTURE.md](../ARCHITECTURE.md)
- Component documentation? → [COMPONENTS.md](./COMPONENTS.md)
- How to commit? → [CONTRIBUTING.md](../CONTRIBUTING.md)
- AI workflow? → [CLAUDE.md](../CLAUDE.md)
- Testing strategy? → [TESTING-STRATEGY.md](./TESTING-STRATEGY.md)
- Optimizing AI rules? → [CLAUDE-MD-OPTIMIZATION.md](./CLAUDE-MD-OPTIMIZATION.md)

---

**Last Updated:** 2025-12-05
**Maintained by:** Project contributors
**Questions?** Open an issue
