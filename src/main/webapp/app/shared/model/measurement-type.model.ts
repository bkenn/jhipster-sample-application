import { IBodyMeasurement } from '@/shared/model/body-measurement.model';
import { IWeight } from '@/shared/model/weight.model';

export interface IMeasurementType {
  id?: number;
  name?: string;
  description?: string | null;
  measurementOrder?: number | null;
  measurementUnit?: string | null;
  bodyMeasurements?: IBodyMeasurement[] | null;
  weights?: IWeight[] | null;
}

export class MeasurementType implements IMeasurementType {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string | null,
    public measurementOrder?: number | null,
    public measurementUnit?: string | null,
    public bodyMeasurements?: IBodyMeasurement[] | null,
    public weights?: IWeight[] | null
  ) {}
}
