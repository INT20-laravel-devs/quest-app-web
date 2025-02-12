import { Input } from '@/components/ui/input';
import { parseAsBoolean, useQueryState } from 'nuqs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const QuestFilters = () => {
  const [search, setSearch] = useQueryState('search');
  const [showApprovedOnly, setShowApprovedOnly] = useQueryState(
    'approved',
    parseAsBoolean,
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setSearch(null);
      return;
    }

    setSearch(event.target.value);
  };

  const handleSwitch = (checked: boolean) => {
    if (!checked) {
      setShowApprovedOnly(null);
      return;
    }
    setShowApprovedOnly(checked);
  };

  return (
    <div className="flex gap-3">
      <Input
        placeholder="Search quests"
        value={search as string}
        onChange={handleSearch}
      />
      <div className="flex items-center space-x-2">
        <Switch
          id="approved-filter"
          checked={showApprovedOnly as boolean}
          onCheckedChange={handleSwitch}
        />
        <Label htmlFor="approved-filter">Show approved quests only</Label>
      </div>
    </div>
  );
};

export default QuestFilters;
