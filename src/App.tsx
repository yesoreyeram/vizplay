import { useState, useEffect, useMemo } from 'react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { TopNavbar } from './components/TopNavbar';
import { BottomNavbar } from './components/BottomNavbar';
import { DataInputSection } from './components/DataInputSection';
import { DataParsingControls } from './components/DataParsingControls';
import { VisualizationControls } from './components/VisualizationControls';
import { VisualizationRender } from './components/VisualizationRender';
import { DatasetDialog } from './components/DatasetDialog';
import { parseData, inferDataSchema } from './lib/dataParser';
import type { DataFormat, FieldMapping } from './lib/dataParser';
import { generateVegaSpec, getAvailableFields } from './lib/visualizations/vegaSpecs';
import type { Dataset } from './data/sampleDatasets';

const initialData = JSON.stringify([
  { category: 'A', value: 28 },
  { category: 'B', value: 55 },
  { category: 'C', value: 43 },
  { category: 'D', value: 91 },
  { category: 'E', value: 81 },
], null, 2);

function App() {
  const [rawData, setRawData] = useState(initialData);
  const [dataFormat, setDataFormat] = useState<DataFormat>('json');
  const [jsonataExpression, setJsonataExpression] = useState('');
  const [fieldMappings, setFieldMappings] = useState<FieldMapping[]>([]);
  
  const [vizType, setVizType] = useState('bar');
  const [xField, setXField] = useState('category');
  const [yField, setYField] = useState('value');
  const [colorField, setColorField] = useState('__none__');
  const [sizeField, setSizeField] = useState('__none__');
  const [chartTitle, setChartTitle] = useState('Sample Bar Chart');

  // Parse data whenever inputs change
  const parsedData = useMemo(() => {
    try {
      return parseData(rawData, dataFormat, jsonataExpression, fieldMappings);
    } catch (error) {
      console.error('Parse error:', error);
      return [];
    }
  }, [rawData, dataFormat, jsonataExpression, fieldMappings]);

  // Get available fields from parsed data
  const availableFields = useMemo(() => {
    return getAvailableFields(parsedData);
  }, [parsedData]);

  // Auto-infer field mappings when data changes (if no manual mappings)
  useEffect(() => {
    if (parsedData.length > 0 && fieldMappings.length === 0) {
      const inferred = inferDataSchema(parsedData);
      setFieldMappings(inferred);
    }
  }, [parsedData, fieldMappings.length]);

  // Auto-select fields for visualization
  useEffect(() => {
    if (availableFields.length > 0) {
      if (!xField || !availableFields.includes(xField)) {
        setXField(availableFields[0]);
      }
      if (!yField || !availableFields.includes(yField)) {
        const numericField = availableFields.find(f => {
          const val = parsedData[0]?.[f];
          return typeof val === 'number';
        });
        setYField(numericField || availableFields[1] || availableFields[0]);
      }
    }
  }, [availableFields, parsedData, xField, yField]);

  // Auto-select numeric fields when switching to scatter plot
  useEffect(() => {
    if (vizType === 'scatter' && parsedData.length > 0) {
      const numericFields = availableFields.filter(f => {
        const val = parsedData[0]?.[f];
        return typeof val === 'number';
      });

      // If we have at least 2 numeric fields, use them for scatter plot
      if (numericFields.length >= 2) {
        // Only update if current fields are not numeric
        const xVal = parsedData[0]?.[xField];
        const yVal = parsedData[0]?.[yField];
        
        if (typeof xVal !== 'number') {
          setXField(numericFields[0]);
        }
        if (typeof yVal !== 'number') {
          setYField(numericFields[1] || numericFields[0]);
        }
      }
    }
  }, [vizType, parsedData, availableFields, xField, yField]);

  // Generate Vega spec
  const vegaSpec = useMemo(() => {
    if (parsedData.length === 0 || !xField || !yField) {
      return null;
    }

    try {
      return generateVegaSpec(parsedData, {
        type: vizType,
        xField,
        yField,
        colorField: colorField && colorField !== '__none__' ? colorField : undefined,
        sizeField: sizeField && sizeField !== '__none__' ? sizeField : undefined,
        title: chartTitle,
      });
    } catch (error) {
      console.error('Spec generation error:', error);
      return null;
    }
  }, [parsedData, vizType, xField, yField, colorField, sizeField, chartTitle]);

  const handleLoadDataset = (dataset: Dataset) => {
    setRawData(dataset.data);
    setDataFormat(dataset.format);
    setJsonataExpression('');
    setFieldMappings([]);
    setChartTitle(`${dataset.name} Visualization`);
  };

  const dataStats = {
    rows: parsedData.length,
    fields: availableFields.length,
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <TopNavbar />
      
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* Left Panel - Data Input */}
          <Panel defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">
              {/* Data Input */}
              <Panel defaultSize={60} minSize={20}>
                <div className="h-full border-r">
                  <div className="h-full flex flex-col">
                    <div className="border-b p-2.5 flex items-center justify-between">
                      <h2 className="font-semibold text-sm">Data Input</h2>
                      <DatasetDialog onLoadDataset={handleLoadDataset} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <DataInputSection value={rawData} onChange={setRawData} />
                    </div>
                  </div>
                </div>
              </Panel>
              
              <PanelResizeHandle className="h-2 bg-border hover:bg-primary/20 transition-colors cursor-row-resize" />
              
              {/* Data Parsing Controls */}
              <Panel defaultSize={40} minSize={20}>
                <div className="h-full border-r">
                  <div className="h-full flex flex-col">
                    <div className="border-b p-2.5">
                      <h2 className="font-semibold text-sm">Data Parsing</h2>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <DataParsingControls
                        format={dataFormat}
                        onFormatChange={setDataFormat}
                        jsonataExpression={jsonataExpression}
                        onJsonataChange={setJsonataExpression}
                        fieldMappings={fieldMappings}
                        onFieldMappingsChange={setFieldMappings}
                      />
                    </div>
                  </div>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
          
          <PanelResizeHandle className="w-2 bg-border hover:bg-primary/20 transition-colors cursor-col-resize" />
          
          {/* Right Panel - Visualization */}
          <Panel defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">
              {/* Visualization Controls */}
              <Panel defaultSize={35} minSize={20}>
                <div className="h-full">
                  <div className="h-full flex flex-col">
                    <div className="border-b p-2.5">
                      <h2 className="font-semibold text-sm">Visualization Settings</h2>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <VisualizationControls
                        vizType={vizType}
                        onVizTypeChange={setVizType}
                        xField={xField}
                        onXFieldChange={setXField}
                        yField={yField}
                        onYFieldChange={setYField}
                        colorField={colorField}
                        onColorFieldChange={setColorField}
                        sizeField={sizeField}
                        onSizeFieldChange={setSizeField}
                        title={chartTitle}
                        onTitleChange={setChartTitle}
                        availableFields={availableFields}
                      />
                    </div>
                  </div>
                </div>
              </Panel>
              
              <PanelResizeHandle className="h-2 bg-border hover:bg-primary/20 transition-colors cursor-row-resize" />
              
              {/* Visualization Render */}
              <Panel defaultSize={65} minSize={30}>
                <div className="h-full">
                  <div className="h-full flex flex-col">
                    <div className="border-b p-2.5">
                      <h2 className="font-semibold text-sm">Visualization Output</h2>
                    </div>
                    <div className="flex-1 overflow-hidden bg-card">
                      <VisualizationRender spec={vegaSpec} />
                    </div>
                  </div>
                </div>
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>
      
      <BottomNavbar dataStats={dataStats} />
    </div>
  );
}

export default App;
