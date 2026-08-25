import { MapPin, Search } from 'lucide-react';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { Suburb } from '../data/suburbs';
import { matchingSuburbs } from '../lib/suburbSearch';

interface SuburbComboboxProps {
  suburbs: Suburb[];
  value: string;
  onSelect: (name: string) => void;
}

export function SuburbCombobox({ suburbs, value, onSelect }: SuburbComboboxProps) {
  const [query, setQuery] = useState(value);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const listId = useId();
  const blurTimer = useRef<number | undefined>(undefined);
  const results = useMemo(() => matchingSuburbs(suburbs, query), [query, suburbs]);

  useEffect(() => setQuery(value), [value]);

  function choose(suburb: Suburb) {
    window.clearTimeout(blurTimer.current);
    setQuery(suburb.name);
    setOpen(false);
    setActiveIndex(0);
    onSelect(suburb.name);
  }

  function restoreOrChooseExact() {
    const exact = suburbs.find(
      (suburb) => suburb.name.toLocaleLowerCase('en-AU') === query.trim().toLocaleLowerCase('en-AU'),
    );
    if (exact) choose(exact);
    else setQuery(value);
    setOpen(false);
  }

  return (
    <div className="suburb-combobox">
      <label className="search-wrap">
        <span className="sr-only">Starting suburb</span>
        <MapPin size={18} aria-hidden="true" />
        <input
          type="search"
          role="combobox"
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={open}
          aria-activedescendant={open && results[activeIndex] ? `${listId}-${activeIndex}` : undefined}
          autoComplete="off"
          placeholder="Start typing a Perth suburb"
          value={query}
          onFocus={() => setOpen(true)}
          onBlur={() => {
            blurTimer.current = window.setTimeout(restoreOrChooseExact, 120);
          }}
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
            setOpen(true);
          }}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              setOpen(true);
              setActiveIndex((current) => Math.min(current + 1, results.length - 1));
            } else if (event.key === 'ArrowUp') {
              event.preventDefault();
              setActiveIndex((current) => Math.max(current - 1, 0));
            } else if (event.key === 'Enter' && open && results[activeIndex]) {
              event.preventDefault();
              choose(results[activeIndex]);
            } else if (event.key === 'Escape') {
              setQuery(value);
              setOpen(false);
            }
          }}
        />
        <Search size={17} aria-hidden="true" />
      </label>

      {open && query.trim() && (
        <ul id={listId} className="suburb-results" role="listbox" aria-label="Matching Perth suburbs">
          {results.length ? (
            results.map((suburb, index) => (
              <li
                id={`${listId}-${index}`}
                key={suburb.name}
                role="option"
                aria-selected={index === activeIndex}
                className={index === activeIndex ? 'active' : ''}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => choose(suburb)}
              >
                <MapPin size={15} aria-hidden="true" />
                {suburb.name}
              </li>
            ))
          ) : (
            <li className="suburb-empty">No Perth suburb found. Try another spelling.</li>
          )}
        </ul>
      )}
      <span className="suburb-count">Search all {suburbs.length} Perth metropolitan suburbs</span>
    </div>
  );
}
