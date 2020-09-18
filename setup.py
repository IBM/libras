import setuptools

with open("README.md", "r") as fh:
    long_description = fh.read()

setuptools.setup(
    name="libras",
    version="0.1.0",
    author="Bruno Lima",
    author_email="blima@br.ibm.com",
    description="Translation service between a spoken and a signed language.",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/IBM/libras",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: Apache 2 License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.8',
)