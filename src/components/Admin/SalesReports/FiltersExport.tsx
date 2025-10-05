import PrimaryButton from '@/common/PrimaryButton';
import { Download } from 'lucide-react';
import { FC } from 'react';

interface FiltersExportProps {
  title?: string;
  subtitle?: string;
  handleExport?: () => void;
}

const FiltersExport: FC<FiltersExportProps> = ({ title, subtitle, handleExport }) => {
  return (
    <div className="w-full py-3 px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0">
        <div>
          {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
          {subtitle && <p className="mt-1 text-sm text-gray-600">{subtitle}</p>}
        </div>

        <PrimaryButton
          className="flex items-center justify-center gap-2 bg-[#155df6] hover:bg-blue-700 text-white px-6 md:px-8 py-2 border border-[#70797E] rounded-md text-sm font-medium transition-colors w-full md:w-auto"
          title="Export"
          type="Primary"
          leftIcon={<Download size={18} />}
          onClick={handleExport}
        />
      </div>
    </div>
  );
};

export default FiltersExport;
