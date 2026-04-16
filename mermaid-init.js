import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';

mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    primaryColor: '#86BC25',
    primaryTextColor: '#ffffff',
    primaryBorderColor: '#6F9D1E',
    lineColor: '#3AEA37',
    secondaryColor: '#104E44',
    tertiaryColor: '#f8fafc',
    fontFamily: 'Inter, system-ui, sans-serif',
    fontSize: '14px'
  },
  flowchart: {
    htmlLabels: true,
    curve: 'basis'
  }
});
