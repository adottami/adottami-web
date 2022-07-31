export type DeepPartial<Type> = {
  [Key in keyof Type]?: Type[Key] extends (infer ArrayItem)[]
    ? DeepPartial<ArrayItem>[]
    : Type[Key] extends (...parameters: unknown[]) => unknown
    ? Type[Key]
    : DeepPartial<Type[Key]>;
};
