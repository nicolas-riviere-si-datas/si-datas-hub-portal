import { SetMetadata } from '@nestjs/common';
import { SECTION_KEY, ACTION_KEY } from '../guards/section.guard';

export const Section = (section: string, action: 'read' | 'write' | 'delete' = 'read') => {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    SetMetadata(SECTION_KEY, section)(target, key, descriptor);
    SetMetadata(ACTION_KEY, action)(target, key, descriptor);
    return descriptor;
  };
};
