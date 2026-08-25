import '@testing-library/jest-dom/vitest';

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserverMock;
window.scrollTo = () => undefined;
HTMLElement.prototype.scrollIntoView = () => undefined;

