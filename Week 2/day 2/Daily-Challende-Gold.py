import random

class Gene:
    def __init__(self, value=None):
        # Initialize gene to 0 or 1 randomly if not provided
        self.value = value if value in (0, 1) else random.choice([0, 1])

    def mutate(self):
        """Flips the gene value (0 -> 1, 1 -> 0)."""
        self.value = 1 if self.value == 0 else 0

    def __repr__(self):
        return str(self.value)


class Chromosome:
    def __init__(self, size=10):
        self.genes = [Gene() for _ in range(size)]

    def mutate(self, probability=0.5):
        """Randomly mutates genes based on a given probability (default 50% chance per gene)."""
        for gene in self.genes:
            if random.random() < probability:
                gene.mutate()

    def is_all_ones(self):
        return all(gene.value == 1 for gene in self.genes)

    def __repr__(self):
        return "".join(str(g) for g in self.genes)


class DNA:
    def __init__(self, size=10):
        self.chromosomes = [Chromosome() for _ in range(size)]

    def mutate(self, probability=0.5):
        """Triggers mutation across all chromosomes based on probability."""
        for chromosome in self.chromosomes:
            chromosome.mutate(probability)

    def is_all_ones(self):
        """Returns True if every gene across all 10 chromosomes is equal to 1."""
        return all(chromo.is_all_ones() for chromo in self.chromosomes)

    def count_ones(self):
        """Utility method to track fitness/progress towards target."""
        return sum(g.value for chromo in self.chromosomes for g in chromo.genes)

    def __repr__(self):
        return "\n".join(str(c) for c in self.chromosomes)


class Organism:
    def __init__(self, dna=None, environment_mutation_prob=0.5):
        self.dna = dna if dna is not None else DNA()
        self.environment_mutation_prob = environment_mutation_prob
        self.generations = 0

    def mutate(self):
        """Mutates organism DNA using environmental probability and updates generation counter."""
        self.dna.mutate(self.environment_mutation_prob)
        self.generations += 1

    def is_perfect(self):
        """Returns True if DNA is completely composed of 1s."""
        return self.dna.is_all_ones()


def run_simulation(num_organisms=5, mutation_prob=0.01):
    """
    Simulates a population of organisms mutating until one reaches all 1s.
    Note: Lower mutation probabilities (e.g., 0.01 or 1%) reach target genomes 
    faster than high unguided flipping rates (50%), which introduce noise.
    """
    population = [Organism(environment_mutation_prob=mutation_prob) for _ in range(num_organisms)]
    
    print(f"Starting simulation with {num_organisms} organisms...")
    print(f"Environmental mutation rate per gene: {mutation_prob * 100}%\n")

    generation = 0
    while True:
        generation += 1
        for idx, organism in enumerate(population):
            organism.mutate()
            
            if organism.is_perfect():
                print(f"🎉 Perfect DNA achieved by Organism #{idx + 1}!")
                print(f"Total Generations: {generation}")
                return organism, generation

        # Progress tracker every 1,000 generations
        if generation % 1000 == 0:
            best_fitness = max(org.dna.count_ones() for org in population)
            print(f"Generation {generation} | Highest 1s count: {best_fitness}/100")


if __name__ == "__main__":
    run_simulation(num_organisms=10, mutation_prob=0.02)