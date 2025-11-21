import Papa from 'papaparse';
import yaml from 'js-yaml';
import { xml2js } from 'xml-js';
import jsonata from 'jsonata';

export type DataFormat = 'json' | 'csv' | 'tsv' | 'xml' | 'yaml';
export type FieldType = 'string' | 'number' | 'boolean' | 'date' | 'datetime' | 'epoch-s' | 'epoch-ms';

export interface FieldMapping {
  field: string;
  type: FieldType;
}

export function parseData(
  rawData: string,
  format: DataFormat,
  jsonataExpression?: string,
  fieldMappings?: FieldMapping[]
): any[] {
  let parsedData: any;

  try {
    // Parse based on format
    switch (format) {
      case 'json':
        parsedData = JSON.parse(rawData);
        break;
      
      case 'csv':
        const csvResult = Papa.parse(rawData, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });
        parsedData = csvResult.data;
        break;
      
      case 'tsv':
        const tsvResult = Papa.parse(rawData, {
          header: true,
          delimiter: '\t',
          dynamicTyping: true,
          skipEmptyLines: true,
        });
        parsedData = tsvResult.data;
        break;
      
      case 'xml':
        const xmlResult = xml2js(rawData, { compact: true });
        parsedData = xmlResult;
        break;
      
      case 'yaml':
        parsedData = yaml.load(rawData);
        break;
      
      default:
        parsedData = JSON.parse(rawData);
    }

    // Apply JSONata transformation if provided
    if (jsonataExpression && jsonataExpression.trim()) {
      try {
        const expression = jsonata(jsonataExpression);
        parsedData = expression.evaluate(parsedData);
      } catch (error) {
        console.error('JSONata expression error:', error);
      }
    }

    // Ensure data is an array
    if (!Array.isArray(parsedData)) {
      parsedData = [parsedData];
    }

    // Apply field mappings
    if (fieldMappings && fieldMappings.length > 0) {
      parsedData = parsedData.map((item: any) => {
        const mappedItem: any = { ...item };
        
        fieldMappings.forEach(mapping => {
          if (item[mapping.field] !== undefined) {
            mappedItem[mapping.field] = convertFieldType(item[mapping.field], mapping.type);
          }
        });
        
        return mappedItem;
      });
    }

    return parsedData;
  } catch (error) {
    console.error('Data parsing error:', error);
    return [];
  }
}

function convertFieldType(value: any, type: FieldType): any {
  if (value === null || value === undefined) return value;

  switch (type) {
    case 'string':
      return String(value);
    
    case 'number':
      const num = Number(value);
      return isNaN(num) ? value : num;
    
    case 'boolean':
      if (typeof value === 'boolean') return value;
      if (typeof value === 'string') {
        const lower = value.toLowerCase();
        if (lower === 'true' || lower === '1' || lower === 'yes') return true;
        if (lower === 'false' || lower === '0' || lower === 'no') return false;
      }
      return Boolean(value);
    
    case 'date':
    case 'datetime':
      return new Date(value);
    
    case 'epoch-s':
      return new Date(Number(value) * 1000);
    
    case 'epoch-ms':
      return new Date(Number(value));
    
    default:
      return value;
  }
}

export function inferDataSchema(data: any[]): FieldMapping[] {
  if (!data || data.length === 0) return [];

  const sample = data[0];
  const mappings: FieldMapping[] = [];

  Object.keys(sample).forEach(key => {
    const value = sample[key];
    let type: FieldType = 'string';

    if (typeof value === 'number') {
      type = 'number';
    } else if (typeof value === 'boolean') {
      type = 'boolean';
    } else if (typeof value === 'string') {
      // Try to detect dates
      if (!isNaN(Date.parse(value))) {
        type = 'datetime';
      }
    }

    mappings.push({ field: key, type });
  });

  return mappings;
}
