import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Command, CommandInput, CommandItem, CommandGroup, CommandList, CommandEmpty } from '@/components/ui/command';

interface AutocompleteProps {
  data: any[];
  placeholder?: string;
  onSelect?: (clientId: string) => void;
}

const Autocomplete: React.FC<AutocompleteProps> = ({ data, placeholder = 'Search...', onSelect }) => {
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<any[]>([]);

  useEffect(() => {
    if (inputValue) {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredData(filtered);
      setIsOpen(filtered.length > 0);
    } else {
      setIsOpen(false);
      setFilteredData([]);
    }
  }, [inputValue, data]);

  const handleSelect = (clientId: string) => {
    const selectedClient = data.find((client) => client.id === clientId);
    if (selectedClient) {
      setInputValue(selectedClient.name);
      setIsOpen(false);
      if (onSelect) {
        onSelect(clientId); // Return the client ID
      }
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full"
        />
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full">
        <Command>
          <CommandInput
            placeholder="Type to search..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <CommandList>
            {filteredData.length > 0 ? (
              <CommandGroup>
                {filteredData.map((client) => (
                  <CommandItem key={client.id} onSelect={() => handleSelect(client.id)}>
                    {client.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Autocomplete;
