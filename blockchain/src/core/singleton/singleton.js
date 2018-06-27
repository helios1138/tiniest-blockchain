const instances = new Map()
const overrides = new Map()

export const override = (Constructor, OverrideConstructor) => {
  if (instances.has(Constructor)) {
    throw new Error('Cannot override implementation that was already instantiated')
  }

  overrides.set(Constructor, OverrideConstructor)
}

export const instance = Constructor => {
  if (!instances.has(Constructor)) {
    const ActualConstructor = overrides.has(Constructor)
      ? overrides.get(Constructor)
      : Constructor

    instances.set(Constructor, ActualConstructor(instance))
  }

  return instances.get(Constructor)
}

export const reset = () => { instances.clear() }
